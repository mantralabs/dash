<?php
namespace Project;

return array(
    'router' => array(
        'routes' => array(
            'home' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',
                    'defaults' => array(
                        'controller' => 'Project\Controller\Index'
                    ),
                ),
            ),            
           
             'project' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/project[/:id]',
                    'constraints' => array(
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Project\Controller\Project'
                    ),
                ),
            ),
            
          'project-member-create' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/project/project-member-create',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Project\Controller',
                        'controller'    => 'Project',
                        'action'        => 'project-member-create',
                    )
                ),
            ),

            'uploaddocument' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/project/uploaddocument',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Project\Controller',
                        'controller'    => 'Project',
                        'action'        => 'uploaddocument',
                    )
                ),
            ),
                         
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Project\Controller\Project'   => 'Project\Controller\ProjectController',
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
                'paths' => array(__DIR__ . '/../src/Project/Entity')
            ),
            'orm_default' => array(
                'drivers' => array(
                    'Project\Entity' => 'application_entities'
                )
            )
        ),       
    ),
  
);
