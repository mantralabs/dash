<?php

namespace User;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;
use Zend\View\Model\JsonModel;

use Zend\Authentication\Adapter\DbTable as DbAuthAdapter;
use Zend\Authentication\AuthenticationService;
use Zend\Session\Container;

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        $eventManager        = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);

        $eventManager->attach(MvcEvent::EVENT_DISPATCH_ERROR, array($this, 'onDispatchError'), 0);
        $eventManager->attach(MvcEvent::EVENT_RENDER_ERROR, array($this, 'onRenderError'), 0);
        
//        $this -> initAcl($e);
//        $e->getApplication() -> getEventManager() -> attach('route', array($this, 'checkAcl'));
    }
    
     public function initAcl(MvcEvent $e) {
 
        $acl = new \Zend\Permissions\Acl\Acl();
        $roles = include __DIR__ . '/config/module.acl.roles.php';
        $allResources = array();
        foreach ($roles as $role => $resources) {

            $role = new \Zend\Permissions\Acl\Role\GenericRole($role);
            $acl -> addRole($role);

            //$allResources = array_merge($resources, $allResources);

            //adding resources
            foreach ($resources as $resource) {
                 // Edit 4
                 if(!$acl ->hasResource($resource))
                    $acl -> addResource(new \Zend\Permissions\Acl\Resource\GenericResource($resource));
            }
            //adding restrictions
            foreach ($resources as $resource) {
                $acl -> allow($role, $resource);
            }
        }

        //setting to view
        $e -> getViewModel() -> acl = $acl;

    }

    public function checkAcl(MvcEvent $e) {
        $request = $e->getRequest();
        $route = $e -> getRouteMatch() -> getMatchedRouteName();
        $controller = $e->getRouteMatch ()->getParam ( 'controller' );
        $action = $e->getRouteMatch ()->getParam ( 'action' );
        if($action == '') {
            if($request->isPost()) {
                $action = 'create';
            }else if($request->isGet()) {
                 $action = 'get';
            }
            else if($request->isPut()) {
                 $action = 'update';
            }
            else if($request->isDelete()) {
                 $action = 'delete';
            }
        }
        
        $requestedResourse = $controller . "-" . $action;
               
        $serviceManager = $e->getApplication()->getServiceManager();
        $authService = $serviceManager->get('doctrine.authenticationservice.orm_default');
        $loggedInUser = $authService->getIdentity();
        //you set your role
        $userRole = ($loggedInUser && $loggedInUser->role) ? $loggedInUser->role : '0';

        if ((!($e -> getViewModel() -> acl ->hasResource($requestedResourse)) || !$e -> getViewModel() -> acl -> isAllowed($userRole, $requestedResourse))) {
            $url = 'invalidAccess';       
            $response = $e -> getResponse();
            $response->setHeaders ( $response->getHeaders ()->addHeaderLine ( 'Location', $url ) );
            $response->setStatusCode ( 401 );
            $response->sendHeaders ();
            exit ();
        }
    }

    public function onDispatchError($e)
    {
        return $this->getJsonModelError($e);
    }

    public function onRenderError($e)
    {
        return $this->getJsonModelError($e);
    }

    public function getJsonModelError($e)
    {
        $error = $e->getError();
        if (!$error) {
            return;
        }

        $response = $e->getResponse();

        $exception = $e->getParam('exception');
        if($exception){
            $status = $exception->getCode();
            if($status == 400)
                $response->setStatusCode(400);
        }

        $exceptionJson = array();
        if ($exception) {
            $exceptionJson = array(
                'class' => get_class($exception),
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                'message' => $exception->getMessage(),
                'stacktrace' => $exception->getTraceAsString()
            );
        }
        $message = 'An error occurred during execution; please try again later.';
        if(!empty($status) && $status == 400)
            $message = $exception->validationErrors;

        $errorJson = array(
            'message'   => $message,
            'error'     => $error,
            'exception' => $exceptionJson,
        );
        if ($error == 'error-router-no-match') {
            $errorJson['message'] = 'Resource not found.';
        }

        $model = new JsonModel(array('errors' => array($errorJson)));
        // $model = new JsonModel(array());

        $e->setResult($model);

        return $model;
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }
    public function getServiceConfig()
    {
        return array(
            'factories' => array(
                'AuthService' => function ($serviceManager) {
                    $adapter = $serviceManager->get('Zend\Db\Adapter\Adapter');
                    $dbAuthAdapter = new DbAuthAdapter ( $adapter, 'User', 'email', 'password' );
                    	
                    $auth = new AuthenticationService();
                    $auth->setAdapter ( $dbAuthAdapter );
                    return $auth;
                },
                'Zend\Authentication\AuthenticationService' => function($serviceManager) {
                    // If you are using DoctrineORMModule:
                    return $serviceManager->get('doctrine.authenticationservice.orm_default');
                }
            ),
        );
    }
}
