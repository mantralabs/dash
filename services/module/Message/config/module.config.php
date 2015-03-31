<?php
namespace Message;

return array(
    'router' => array(
        'routes' => array(
            'home' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',
                    'defaults' => array(
                        'controller' => 'Message\Controller\Index'
                    ),
                ),
            ),            
          
//             'index' => array(
//                'type' => 'Segment',
//                'options' => array(
//                    'route' => '/message/index',
//                    'defaults' => array(
//                        '__NAMESPACE__' => 'Message\Controller',
//                        'controller'    => 'Message',
//                        'action'        => 'index',
//                    )
//                ),
//            ),
            
//            'message' => array(
//                'type' => 'segment',
//                'options' => array(
//                    'route' => '/message[/:id]',
//                        'constraints' => array(
//                            'id' => '[0-9]+',
//                        ),
//                        'defaults' => array(
//                            'controller' => 'Message\Controller\MessageController',
//                        ),
//                ),
//             ),
//             
//             
//            
             'message' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/message[/:id]',
                    'constraints' => array(
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Message\Controller\Message',
                    ),
                ),
            ),
            
                  
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Message\Controller\Message'   => 'Message\Controller\MessageController',
        ),
    ),
    'view_manager' => array(
        'strategies' => array(
            'ViewJsonStrategy',
        ),
    ),    
    'doctrine' => array(
        'driver' => array(
            'application_entities' => array(
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => array(__DIR__ . '/../src/Message/Entity')
            ),
            'orm_default' => array(
                'drivers' => array(
                    'Message\Entity' => 'application_entities'
                )
            )
        ),       
    ),
  
);
