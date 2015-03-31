<?php
namespace Activity\Controller;

use Activity\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
//use \Exception;


class ActivityController extends AbstractRestfulJsonController{

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
          $project = $this->getEntityManager()->getRepository('Activity\Entity\Activity')->findAll();
          $project = array_map(function($message){
            return $message->toArray();
        }, $project);
        return new JsonModel($project);
     }
     
      public function get($id){   
        // Action used for GET requests with resource Id
        $project = $this->getEntityManager()->getRepository('Activity\Entity\Activity')->find($id);
        return new JsonModel(
            $project->toArray()
        );
    }
    
    
    public function getProjectbyUserAction(){
         $logged_in_user_details = array();
         $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
         if($authService->hasIdentity()){
            $user = $authService->getIdentity();
            $logged_in_user_details = $user->toArray();            
         }
         $id=$logged_in_user_details['id'];
         $em = $this->getEntityManager();
         $queryBuilder = $em->createQueryBuilder();
         $queryBuilder->select('o.projectname')->from('Project\Entity\Project', 'o')
         ->where('o.id = :idlike')
         ->setParameter('idlike', "$id");
         $result = $queryBuilder->getQuery();
         $getdata=$result->getResult();          
         echo json_encode($getdata);
         return new JsonModel(array('status'=>'ok'));
        
    }
    
     public function postCommentAction(){
         $logged_in_user_details = array();
         $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
         if($authService->hasIdentity()){
            $user = $authService->getIdentity();
            $logged_in_user_details = $user->toArray();            
         }
         $id=$logged_in_user_details['id'];
         $em = $this->getEntityManager();
         $queryBuilder = $em->createQueryBuilder();
         $queryBuilder->select('o.projectname')->from('Project\Entity\Project', 'o')
         ->where('o.id = :idlike')
         ->setParameter('idlike', "$id");
         $result = $queryBuilder->getQuery();
         $getdata=$result->getResult();          
         echo json_encode($getdata);
         return new JsonModel(array('status'=>'ok'));
        
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
        $projectID=$data['project_id'];
        //print_r($workspceID); exit();
        $user = $this->getEntityManager()->getRepository('User\Entity\User')->find($id);
        $project = $this->getEntityManager()->getRepository('Project\Entity\Project')->find($projectID);
        //print_r($workspace); exit();
        $createmsg = new \Activity\Entity\Activity($data); 
        //print_r($data); exit();
        //$data['activity_deatil'];
        $currentDateTime = date('Y-m-d H:i:s');
        $data['date']=$currentDateTime;
        $data['user_id'] = $user;
        $data['project_id']= $project;
        $projectEntity = $createmsg->exchangeArray($data);
        $this->getEntityManager()->persist($projectEntity);
        $this->getEntityManager()->flush(); 
        return new JsonModel(array('status'=>'ok'));
    }

    
    
  public function update($id, $data){
        // Action used for PUT requests
        //print_r($data);
        $project = $this->getEntityManager()->getRepository('Activity\Entity\Activity')->find($id);
        $project->set($data);
        $project->validate($this->em);
        
        $this->getEntityManager()->flush();
        
        return new JsonModel($project->toArray());
    }

    public function delete($id){
        // Action used for DELETE requests
        $project = $this->getEntityManager()->getRepository('Activity\Entity\Activity')->find($id);
        $this->getEntityManager()->remove($project);
        
        $this->getEntityManager()->flush();
        
        return new JsonModel($project->toArray());
    }


}