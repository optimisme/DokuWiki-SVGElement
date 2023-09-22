<?php                                                      
                                                           
if(!defined('DOKU_INC')) die();                            
  
class action_plugin_svgelement extends DokuWiki_Action_Plugin {
 
    public function register(Doku_Event_Handler $controller) {
        $controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this, 'handle_js_addition');
    }
 
    public function handle_js_addition(Doku_Event $event, $param) {
        $event->data['script'][] = array (
            'type'    => 'text/javascript',
            'src'     => DOKU_BASE . 'lib/plugins/svgelement/scripts/svgelement.js',       
            '_data'   => '',
        );
    }

    public function getInfo() {
        return array(
            'author' => 'Albert Palacios',
            'email'  => 'mail@exemple.com',
            'date'   => '2023-09-22', 
            'name'   => 'SVG Element Plugin',
            'desc'   => 'Display SVG elements in an appropriate SVG element, but removing any potential script to prevent security issues.',
            'url'    => 'https://github.com/optimisme/DokuWiki-SVGElement');
    }
}