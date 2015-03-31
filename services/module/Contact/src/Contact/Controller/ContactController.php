<?php
namespace Contact\Controller;

use Contact\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
//use \Exception;


class ContactController extends AbstractRestfulJsonController{

    protected $em;
    
    public function getEntityManager(){
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('doctrine.entitymanager.orm_default');
        }
        return $this->em;
    }

    public function indexAction(){
         // print_r($data); exit();
        echo 'hai'; exit();
    }
    
     public function getList()     {
          $users = $this->getEntityManager()->getRepository('Contact\Entity\Contact')->findAll();
          $users = array_map(function($message){
            return $message->toArray();
        }, $users);
        return new JsonModel($users);
     }
     
      public function get($id){   
        // Action used for GET requests with resource Id
        $contact = $this->getEntityManager()->getRepository('Contact\Entity\Contact')->find($id);
        return new JsonModel(
            $contact->toArray()
        );
    }
    
       public function create(){
        $data = $this->getRequest()->getContent();
        $data = (!empty($data))? get_object_vars(json_decode($data)) : '';
        $userid=$data['user_id'];
        $workspaceid=$data['workspace_id'];
        //print_r($workspaceid); exit();
        $createmsg = new \Contact\Entity\Contact();
        $user = $this->getEntityManager()->getRepository('User\Entity\User')->find($userid);
        $workspace = $this->getEntityManager()->getRepository('Workspace\Entity\Workspace')->find($workspaceid);
       // print_r($workspace); exit();
        $candidateEntity = $createmsg->exchangeArray(array('user_id'=>$user, 'workspace_id'=>$workspace));
        $this->getEntityManager()->persist($candidateEntity);
        $this->getEntityManager()->flush(); 
         return new JsonModel(array('status'=>'success'));
    }
     
//    public function create(){
////        $request = $this->getRequest();
////        $logged_in_user_details = array();
////        $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
////        if($authService->hasIdentity()){
////            //print_r('jnhgd'); exit();
////            $user = $authService->getIdentity();
////            $logged_in_user_details = $user->toArray();            
////        }
////        print_r($logged_in_user_details); exit();
//       // print_r($data); exit();
//        //echo 'jhd'; exit();
////          $data = $this->getRequest()->getContent();
////        $data = (!empty($data))? get_object_vars(json_decode($data)) : '';
////        //print_r($data); exit();
////       // $data['email'] = 'neetha@gmail.com';
////        //$data['password'] = md5('neetha');
////        $user = new \User\Entity\User($data);
////            $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
////            $adapter->setIdentityValue($data['email']);
////            $authResult = $authService->authenticate();
////            if ($authResult->isValid()) {
////                $identity = $authResult->getIdentity();
////                $authService->getStorage()->write($identity);
////                $identity = $authResult->getIdentity();
////                $logged_in_user_details = $identity->toArray();
//////                print_r( $logged_in_user_details['id']);
//////                exit();
////                print_r($logged_in_user_details); exit();
////            }
////            return new JsonModel(array('status'=>'success','data'=>$logged_in_user_details));
////        $this->getEntityManager();
////        $createmsg = new \Contact\Entity\Contact($data);
////        $createmsg->validate($this->em);
////        $this->getEntityManager()->persist($createmsg);
////        $this->getEntityManager()->flush();
//        //echo $createmsg->id; exit();
//        //print_r( $createmsg);  exit();
//        //$idd=  $createmsg->id;
//        //print_r($data); exit();
//       
//       // $this->getEntityManager();
//         $data = $this->getRequest()->getContent();
//         print_r($data); exit();
//        $createmsg = new \Contact\Entity\Contact($data);
//        //print_r($createmsg); exit();
//        $createmsg->validate($this->em);
//        $this->getEntityManager()->persist($createmsg);
//        $this->getEntityManager()->flush(); 
//         //return new JsonModel(array('status'=>'success'));
//		 
//    }
    
    
      public function update($id, $data){
        // Action used for PUT requests
       // print_r($data);
        $user = $this->getEntityManager()->getRepository('Contact\Entity\Contact')->find($id);
        $user->set($data);
        $user->validate($this->em);
        
        $this->getEntityManager()->flush();
        
        return new JsonModel($user->toArray());
    }

    public function delete($id){
        // Action used for DELETE requests
        $user = $this->getEntityManager()->getRepository('Contact\Entity\Contact')->find($id);
        $this->getEntityManager()->remove($user);
        
        $this->getEntityManager()->flush();
        
        return new JsonModel($user->toArray());
    }


}