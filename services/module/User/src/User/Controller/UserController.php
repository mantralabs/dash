<?php
namespace User\Controller;

use User\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use Zend\Session\Container;
use Zend\Validator\File\UploadFile;


use Zend\Mail;

class UserController extends AbstractRestfulJsonController{

    protected $em;
    protected $authservice;
    protected $storage;

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
    

    
     public function getSessionStorage() {
        if (! $this->storage) {
            $this->storage = $this->getServiceLocator()
                                  ->get('User\Model\MyAuthStorage');
        }

        return $this->storage;
    }
    
    public function loginAction(){
        $data = $this->getRequest()->getContent();
        $data = (!empty($data))? get_object_vars(json_decode($data)) : '';
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

    public function create(){
        $data = $this->getRequest()->getContent();
        $data = (!empty($data))? get_object_vars(json_decode($data)) : '';
        $this->getEntityManager();                   
        $hash_string = $data['email'].date('Y-m-d H:i:s');
        $hash = md5($hash_string);
        $data['hash'] = $hash;
        //$image= $_FILES['photo']['name'];
        //$image_tmp_name= $_FILES['photo']['tmp_name'];
        //move_uploaded_file ($image_tmp_name,"photos/$image");
        $user = new \User\Entity\User($data);        
        if($user->validate($this->em)){
            $this->getEntityManager()->persist($user);
            $this->getEntityManager()->flush();  
           // $image= new UploadFile($image);
           // print_r($image); exit();
//            $content = '<p>Dear '.$data['username'].'</p>';
//            $content .= '<p>You have successfully registered with DASH.</p>';
//            $content .= '<p>Please click on the link to set a password for your account.</p>';
//            $content .= '<p></p>';
//            //$content .= '<p><a href="'.$data['return_url'].'reset-password?hash='.$hash.'">Set Password</a></p>';
//            $content .= '<p></p>';
//            $content .= '<p>Thank you</p>';
//            $plugin = $this->SendEmailPlugin();
//            $plugin->sendemail($content, 'donotreply@dash.com', $data['email'], 'DASH : Email Verification', true);
              return new JsonModel(array('status'=>'success'));
//            $contents = file_get_contents($image);
//            echo $contents;
//            exit();
//            $mime="razak";
//  $base64   = base64_encode($contents); 
//  return new JsonModel(array ('data:' . $mime . ';base64,' .  $contents));
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
    
     public function forgotPasswordAction(){     
         $data = $this->getRequest()->getContent();
         $data = (!empty($data))? get_object_vars(json_decode($data)) : '';
         $emailaddress1 = $data;
         //print_r( $emailaddress1);
         if(($emailaddress1['email']=="")){
             return new JsonModel(array('status'=>'Enter email address','data'=>array()));
         }
         $emailaddress=$emailaddress1['email'];
         $em = $this->getEntityManager();
         $queryBuilder = $em->createQueryBuilder();
         $queryBuilder->select('o.username,o.password,o.email,o.user_id')->from('User\Entity\User', 'o')
                 ->where('o.email = :emailaddress')
                 ->setParameter('emailaddress', $emailaddress);
         $result = $queryBuilder->getQuery();
        // print_r($result);exit();
         $getdata=$result->getResult(); 
         //print_r($getdata); exit();
         if(!empty($getdata)){
         //print_r($getdata); exit();       
         $content = '<p>Dear '.$getdata[0]['username'].',</p>';
         $content .= '<p>Password details are below.</p>';
         $content .= '<p>Username : '.$getdata[0]['username'].'</p>';
         $content .= '<p>Password : '.$getdata[0]['password'].'</p>';
         $content .= '<p></p>';
         $plugin = $this->SendEmailPlugin();
         $plugin->sendemail($content, 'donotreply@dash.com', $emailaddress, 'DASH : Forgot Password', true);
         // echo json_encode($getdata);
         return new JsonModel(array('status'=>'ok','data'=>array()));
         }         
         else{
             return new JsonModel(array('status'=>'not ok','data'=>array()));
         }
             
    }
    public function logoutAction(){
        $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
        $authService->clearIdentity();
        return new JsonModel(array('status'=>'success'));
    }
    
    public function invalidAccessAction() {
         return new JsonModel(array('status'=> '401','data'=>'invalid access'));
    }


    
     public function resetPasswordAction(){
         $data = $this->getRequest()->getContent();
         $data = (!empty($data))? get_object_vars(json_decode($data)) : '';
            if(!empty($data['new_password']) && !empty($data['confirm_password'])){
                $new_password = $data['new_password'];
                $confirm_password = $data['confirm_password'];
                //print_r($confirm_password); exit();
                if($new_password == $confirm_password){
                    $logged_in_user_details = array();
                    $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
                    if($authService->hasIdentity()){
                        $user = $authService->getIdentity();
                        $logged_in_user_details = $user->toArray();            
                    }
                    $id=$logged_in_user_details['id'];
                    $email=$logged_in_user_details['email'];
                    $hash_string = $email.date('Y-m-d H:i:s');
                    $hash = md5($hash_string);
                    $user = $this->getEntityManager()->getRepository('User\Entity\User')->find($id);
                    $candidateEntity = $user->exchangeArray(array('password'=>$new_password, 'hash'=>$hash));
                    $user->set($candidateEntity);       
                     $this->getEntityManager()->persist($user);
                     $this->getEntityManager()->flush();    
                     return new JsonModel(array('status'=>'success'));
                } else {
                    return new JsonModel(array('status'=>'error','data'=>array('message'=>'Password didnt match')));
                }
            } else {
                return new JsonModel(array('status'=>'error','data'=>array('message'=>'Invalid inputs')));
            }
        
    }
    
      public function suggestAction(){     
         $request = $this->getRequest();
         $getParams = $request->getQuery();
         $name = $getParams['username'];
         $em = $this->getEntityManager();
         $queryBuilder = $em->createQueryBuilder();
         $queryBuilder->select('o.username,o.photo')->from('User\Entity\User', 'o')
         ->where('o.username LIKE :usernamelike')
         ->setParameter('usernamelike', "$name%");
         $result = $queryBuilder->getQuery();
         $getdata=$result->getResult();          
         echo json_encode($getdata);
         return new JsonModel(array('status'=>'ok'));
//         $json_formt=  json_encode($getdata);
//         print_r($json_formt);
//         return new JsonModel(array('status'=>'ok'));                 
    }
    
    
    public function displayimage(){     
         $request = $this->getRequest();
         $getParams = $request->getQuery();
         $name = $getParams['username'];
         $em = $this->getEntityManager();
         $queryBuilder = $em->createQueryBuilder();
         $queryBuilder->select('o.username,o.photo')->from('User\Entity\User', 'o')
         ->where('o.username LIKE :usernamelike')
         ->setParameter('usernamelike', "$name%");
         $result = $queryBuilder->getQuery();
         $getdata=$result->getResult();          
         echo json_encode($getdata);
         return new JsonModel(array('status'=>'ok'));
//         $json_formt=  json_encode($getdata);
//         print_r($json_formt);
//         return new JsonModel(array('status'=>'ok'));                 
    }
    
   
}