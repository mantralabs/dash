<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'User\Controller\User' => 'User\Controller\UserController',
        ),
    ),
 
    // The following section is new` and should be added to your file
    'router' => array(
        'routes' => array(
            'user' => array(
                'type'    => 'Segment',
                'options' => array(
                    'route'    => '/user[/:action][/:id]',
                    'constraints' => array(
                    	'action' => '[a-zA-Z][a-zA-Z-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'User\Controller\User'
                    ),
                ),
            ),
        ),
    ),
				
    'view_manager' => array( //Add this config
        'strategies' => array(
            'ViewJsonStrategy',
        ),
    ),
);