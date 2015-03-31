<?php
namespace Contact;

return array(
    'router' => array(
        'routes' => array(
            'home' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',
                    'defaults' => array(
                        'controller' => 'Contact\Controller\Index'
                    ),
                ),
            ),            
           
             'contace' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/contact[/:id]',
                    'constraints' => array(
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Contact\Controller\Contact'
                    ),
                ),
            ),
                

                  
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Contact\Controller\Contact'   => 'Contact\Controller\ContactController',
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
                'paths' => array(__DIR__ . '/../src/Contact/Entity')
            ),
            'orm_default' => array(
                'drivers' => array(
                    'Contact\Entity' => 'application_entities'
                )
            )
        ),       
    ),
  
);
