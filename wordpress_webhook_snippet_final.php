<?php
/**
 * Send complete post data—including category slugs and tag names—
 * to an n8n webhook after WP has fully saved everything (with URL).
 */

function send_n8n_webhook_with_url( int $post_id, \WP_Post $post, bool $update ) {
    // Only for standard posts
    if ( $post->post_type !== 'post' ) {
        return;
    }

    // Skip autosaves & revisions
    if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
        return;
    }

    // Pull author info
    $author = get_userdata( $post->post_author );

    // Fetch taxonomies now that they're saved
    $categories = get_the_terms( $post_id, 'category' ) ?: [];
    $tags       = get_the_terms( $post_id, 'post_tag' )   ?: [];

    // Extract category slugs and tag names
    $cat_slugs = wp_list_pluck( $categories, 'slug' );
    $tag_names = wp_list_pluck( $tags,       'name' );

    // Build your payload—with URL instead of post_id
    $payload = [
        'url'          => get_permalink( $post_id ),          // ← URL of the post
        'title'        => $post->post_title,
        'content'      => $post->post_content,
        'excerpt'      => $post->post_excerpt,
        'author_name'  => $author->display_name,
        'date'         => $post->post_date,
        'categories'   => $cat_slugs,
        'tags'         => $tag_names,
    ];

    // Send as raw JSON
    wp_remote_post(
        'https://n8n.srv874889.hstgr.cloud/webhook-test/0d36a8db-0177-4501-9f7a-e46b6829d07a',
        [
            'method'  => 'POST',
            'headers' => [
                'Content-Type' => 'application/json; charset=utf-8',
            ],
            'body'    => wp_json_encode( $payload ),
            'timeout' => 10,
        ]
    );
}
add_action( 'wp_after_insert_post', 'send_n8n_webhook_with_url', 10, 3 );