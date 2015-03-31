<?php
namespace Activity;

return array(
    'router' => array(
        'routes' => array(
            'home' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',
                    'defaults' => array(
                        'controller' => 'Activity\Controller\Index'
                    ),
                ),
            ),            
           
             'activity' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/activity[/:id]',
                    'constraints' => array(
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Activity\Controller\Activity'
                    ),
                ),
            ),
            
              'getProjectbyUser' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/activity/getProjectbyUser',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Activity\Controller',
                        'controller'    => 'Activity',
                        'action'        => 'getProjectbyUser',
                    )
                ),
            ), 
            
               'postComment' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/activity/postComment',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Activity\Controller',
                        'controller'    => 'Activity',
                        'action'        => 'postComment',
                    )
                ),
            ),  
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Activity\Controller\Activity'   => 'Activity\Controller\ActivityController',
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
                'paths' => array(__DIR__ . '/../src/Activity/Entity')
            ),
            'orm_default' => array(
                'drivers' => array(
                    'Activity\Entity' => 'application_entities'
                )
            )
        ),       
    ),
  
);
