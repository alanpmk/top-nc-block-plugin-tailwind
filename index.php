<?php

/*
  Plugin Name: Top Nhà Cái Plugin
  Version: 1.0
  Description: Plugin tạo block Top Nhà Cái cho website, giúp hiển thị thông tin các nhà cái uy tín nhất hiện nay.
  Author: AlanIT
  Author URI:
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class BradsBoilerplate {
  function __construct() {
    add_action('init', array($this, 'onInit'));
  }

  function onInit() {
    wp_register_script('TopNCScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
    wp_enqueue_style('BoxiconsFonts', 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');
    wp_register_style('TopNCStyle', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_register_script('TopNCScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-media'));

    register_block_type('topnhacai/top-nha-cai-plugin', array(
      'render_callback' => array($this, 'renderCallback'),
      'editor_script' => 'TopNCScript',
      'editor_style' => 'TopNCStyle'
    ));
  }

  function renderCallback($attributes) {
    if (!is_admin()) {
      wp_enqueue_script('TopNCFrontendScript', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
      wp_enqueue_style('BoxiconsFonts', 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');
      wp_enqueue_style('TopNCFrontendStyles', plugin_dir_url(__FILE__) . 'build/index.css');
    }

    ob_start(); ?>
    <div class="boilerplate-update-me top-nha-cai-wrapper-class"><pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre></div>
    <?php return ob_get_clean();

  }

  function renderCallbackBasic($attributes) {
    var_dump($attributes);
    return '<div class="boilerplate-frontend">Hello, the sky is ' . $attributes['skyColor'] . ' and the grass is ' . $attributes['grassColor'] . '.</div>';
  }
}

$bradsBoilerplate = new BradsBoilerplate();
