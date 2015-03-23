<?php
namespace User\Controller;

use User\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;

use Zend\Mail;

class UserController extends AbstractRestfulJsonController{

    protected $em;

    public function getEntityManager(){
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('doctrine.entitymanager.orm_default');
        }
        return $this->em;
    }

    public function indexAction(){
        $users = $this->getEntityManager()->getRepository('User\Entity\User')->findAll();
        
        $users = array_map(function($user){
            return $user->toArray();
        }, $users);
        return new JsonModel($users);
    }
    
    // public function loginAction(){
    //     $data['email'] = 'steffi@mantralabsglobal.com';
    //     $data['password'] = md5('123456');
    //     $user = new \User\Entity\User($data);
    //     if($user->validateLogin($this->em)){
    //         $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
    //         $adapter = $authService->getAdapter();
    //         $adapter->setIdentityValue($data['email']);
    //         $adapter->setCredentialValue($data['password']);
    //         $authResult = $authService->authenticate();
    //         if ($authResult->isValid()) {
    //             $identity = $authResult->getIdentity();
    //             $authService->getStorage()->write($identity);
    //             $identity = $authResult->getIdentity();
    //             $logged_in_user_details = $identity->toArray();
    //              return new JsonModel(array('status'=>'success','data'=>$logged_in_user_details));
    //         } else {
    //             return new JsonModel(array('status'=>'error','data'=>array('message'=>'Invalid details')));
    //         }
    //     } 
    // }
    public function loginAction(){
        $data = $this->getRequest()->getContent();
        $data = (!empty($data))? get_object_vars(json_decode($data)) : '';
       // print_r($data); exit();
       // $data['email'] = 'neetha@gmail.com';
        //$data['password'] = md5('neetha');
        $user = new \User\Entity\User($data);
        if($user->validateLogin($this->em)){
            $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
            $adapter = $authService->getAdapter();
            $adapter->setIdentityValue($data['email']);
            $adapter->setCredentialValue($data['password']);
            $authResult = $authService->authenticate();
            if ($authResult->isValid()) {
                $identity = $authResult->getIdentity();
                $authService->getStorage()->write($identity);
                $identity = $authResult->getIdentity();
                $logged_in_user_details = $identity->toArray();
                 return new JsonModel(array('status'=>'success','data'=>$logged_in_user_details));
            } else {
                return new JsonModel(array('status'=>'error','data'=>array('message'=>'Invalid details')));
            }
        } 
    }

    public function logoutAction(){
      $session = new Container('User');
      $session->getManager()->destroy();
      $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
      $authService->clearIdentity();
      return new JsonModel(array('status'=>'success'));
    }
    
    public function getList(){   
        // Action used for GET requests without resource Id
        $users = $this->getEntityManager()->getRepository('User\Entity\User')->findAll();
        $users = array_map(function($user){
            return $user->toArray();
        }, $users);
        return new JsonModel($users);
    }

    public function get($id){   
        // Action used for GET requests with resource Id
        $user = $this->getEntityManager()->getRepository('User\Entity\User')->find($id);
        return new JsonModel(
            $user->toArray()
        );
    }

    public function getMyUsersAction(){
        return $this->getList();
    }

    public function create($data){  
        //print_r($data); exit();
        $this->getEntityManager();                   
        $hash_string = $data['email'].date('Y-m-d H:i:s');
        $hash = md5($hash_string);
        $data['hash'] = $hash;
        
        $user = new \User\Entity\User($data);
        
        if($user->validate($this->em)){
            $this->getEntityManager()->persist($user);
            $this->getEntityManager()->flush();
            
            // $content = '<p>Dear '.$data['username'].'</p>';
            // $content .= '<p>You have successfully registered with DASH.</p>';
            // $content .= '<p>Please click on the link to set a password for your account.</p>';
            // $content .= '<p></p>';
            // $content .= '<p><a href="'.$data['return_url'].'reset-password?hash='.$hash.'">Set Password</a></p>';
            // $content .= '<p></p>';
            // $content .= '<p>Thank you</p>';
            // $plugin = $this->SendEmailPlugin();
            // $plugin->sendemail($content, 'donotreply@dash.com', $data['email'], 'DASH : Email Verification', true);
           return new JsonModel(array('status'=>'success','data'=>array()));
           $this->redirect('http://localhost/pmtool/dash/web/app/index.html#/');
            //return $this->redirect()->toRoute('login.html');
        } 
    }

    public function update($id, $data){
        // Action used for PUT requests
        $user = $this->getEntityManager()->getRepository('User\Entity\User')->find($id);
        $user->set($data);
        $user->validate($this->em);
        
        $this->getEntityManager()->flush();
        
        return new JsonModel($user->toArray());
    }

    public function delete($id){
        // Action used for DELETE requests
        $user = $this->getEntityManager()->getRepository('User\Entity\User')->find($id);
        $this->getEntityManager()->remove($user);
        
        $this->getEntityManager()->flush();
        
        return new JsonModel($user->toArray());
    }
}