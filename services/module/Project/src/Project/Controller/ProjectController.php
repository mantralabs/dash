<?php
namespace Project\Controller;

use Project\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
//use \Exception;


class ProjectController extends AbstractRestfulJsonController{

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
          $project = $this->getEntityManager()->getRepository('Project\Entity\Project')->findAll();
          $project = array_map(function($message){
            return $message->toArray();
        }, $project);

       // print_r($project);
        return new JsonModel($project);
     }
     
      public function get($id){   
        // Action used for GET requests with resource Id
        $project = $this->getEntityManager()->getRepository('Project\Entity\Project')->find($id);
        return new JsonModel(
            $project->toArray()
        );
    }
    
    
    public function projectMemberCreateAction(){        
        $data = $this->getRequest()->getContent();
        $data = (!empty($data))? get_object_vars(json_decode($data)) : '';
       // print_r($data); exit();
        $userid=$data['user_id'];
        $projectid=$data['project_id'];
        $user = $this->getEntityManager()->getRepository('User\Entity\User')->find($userid);
        $project = $this->getEntityManager()->getRepository('Project\Entity\Project')->find($projectid);
        if($project == "" || $user == ""){
             return new JsonModel(array('status'=>'Enter proper user and project ID'));
        }
        else{
        $createmsg1 = new \Project\Entity\ProjectMember($data);
        //print_r($createmsg1); exit();
        $projectMember = $createmsg1->exchangeArray(array('user_id'=>$user, 'project_id'=>$project));
        //print_r($projectMember); exit();
        $this->getEntityManager()->persist($projectMember);
        $this->getEntityManager()->flush(); 
        return new JsonModel(array('status'=>'success'));
        }
    } 
    
    public function create(){        
         $logged_in_user_details = array();
        $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
        if($authService->hasIdentity()){
            $user = $authService->getIdentity();
            $logged_in_user_details = $user->toArray();            
        }
       
        $id=$logged_in_user_details['id'];
        $data = $this->getRequest()->getContent();
        $data = (!empty($data))? get_object_vars(json_decode($data)) : '';
        $workspceID=$data['workspace_id'];
        //print_r($workspceID); exit();
      
        $user = $this->getEntityManager()->getRepository('User\Entity\User')->find($id);
        $workspace = $this->getEntityManager()->getRepository('Workspace\Entity\Workspace')->find($workspceID);
        if($user == "" || $workspace == ""){
             return new JsonModel(array('status'=>'Please create workspace for this project'));
        }
        $createmsg = new \Project\Entity\Project($data); 
        $data['user'] = $user;
        $data['workspace_id'] = $workspace;
        $projectEntity = $createmsg->exchangeArray($data);
        $this->getEntityManager()->persist($projectEntity);
        $this->getEntityManager()->flush(); 
         return new JsonModel(array('status'=>'ok'));
        
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
////        $createmsg = new \Project\Entity\Project($data);
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
//        $createmsg = new \Project\Entity\Project($data);
//        //print_r($createmsg); exit();
//        $createmsg->validate($this->em);
//        $this->getEntityManager()->persist($createmsg);
//        $this->getEntityManager()->flush(); 
//         //return new JsonModel(array('status'=>'success'));
//		 
//    }
    
    
      public function update($id, $data){
        // Action used for PUT requests
        //print_r($data);
        $project = $this->getEntityManager()->getRepository('Project\Entity\Project')->find($id);
        $project->set($data);
        // $project->validate($this->em);
        $this->getEntityManager()->flush();
       
        return new JsonModel($project->toArray());
    }

    public function delete($id){
        // Action used for DELETE requests
        $workspace = $this->getEntityManager()->getRepository('Workspace\Entity\Workspace')->find($id);
        if(!empty($workspace)){
        $this->getEntityManager()->remove($workspace);
        $this->getEntityManager()->flush();
        }
        $project = $this->getEntityManager()->getRepository('Project\Entity\Project')->find($id);
        
        $this->getEntityManager()->remove($project);
        
        $this->getEntityManager()->flush();
        
        return new JsonModel($project->toArray());
        
    }
    public function uploaddocumentAction(){
    
     $allowedExts = array("pdf", "doc", "link");
     $uploaddir = 'public/document/'; // Relative path under public
     if(in_array('pdf', $allowedExts)||!in_array('doc', $allowedExts)||in_array('link', $allowedExts)){
     $uploadfile = $uploaddir . basename($_FILES['doc']['name']);
     if (move_uploaded_file($_FILES['doc']['tmp_name'], $uploadfile)) {
     return new JsonModel(array('status'=>'success'));
      } else {
     return new JsonModel(array('status'=>$_FILES["doc"]["error"]));
     }
 }else{
  return new JsonModel(array('status'=>'please upload pdf or doc or link file'));
 }


    }

}