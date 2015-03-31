<?php
namespace Task;

return array(
    'router' => array(
        'routes' => array(
            'home' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',
                    'defaults' => array(
                        'controller' => 'Task\Controller\Index'
                    ),
                ),
            ),            
           
             'task' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/task[/:id]',
                    'constraints' => array(
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Task\Controller\Task'
                    ),
                ),
            ),
            
            'task-completed' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/task/task-completed',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Task\Controller',
                        'controller'    => 'Task',
                        'action'        => 'task-completed',
                    )
                ),
            ),
            
             'all-completed-task' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/task/all-completed-task',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Task\Controller',
                        'controller'    => 'Task',
                        'action'        => 'all-completed-task',
                    )
                ),
            ),
            
            'task-create' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/task/task-create',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Task\Controller',
                        'controller'    => 'Task',
                        'action'        => 'task-create',
                    )
                ),
            ),
                  
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Task\Controller\Task'   => 'Task\Controller\TaskController',
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
                'paths' => array(__DIR__ . '/../src/Task/Entity')
            ),
            'orm_default' => array(
                'drivers' => array(
                    'Task\Entity' => 'application_entities'
                )
            )
        ),       
    ),
  
);
