<?php
namespace Task\Controller;

use Task\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
//use \Exception;


class TaskController extends AbstractRestfulJsonController{

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
         $logged_in_user_details = array();
        $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
        if($authService->hasIdentity()){
            $user = $authService->getIdentity();
            $logged_in_user_details = $user->toArray();            
        }
        $id=$logged_in_user_details['id']; 
        //print_r($id); exit();
        $queryBuilder = $this->getEntityManager()->createQueryBuilder();
        //$queryBuilder->select("i")->from('Task\Entity\Task', 'i');
       // $loans_array = $this->formatPaginatorResult($queryBuilder);
        $queryBuilder->select('o.task_detail,o.date')->from('Task\Entity\Task', 'o');
//                 ->where('o.task_to = :task_to')
//                 ->setParameter('task_to', $id);
         $result = $queryBuilder->getQuery();
         $getdata=$result->getResult();
         echo json_encode($getdata);
        return new JsonModel(array('status'=>'ok'));
      
     }
     
      public function get($id){   
        // Action used for GET requests with resource Id
        $project = $this->getEntityManager()->getRepository('Task\Entity\Task')->find($id);
        return new JsonModel(
            $project->toArray()
        );
        
    }
    
    public function taskCreateAction(){
      
       $data = $this->getRequest()->getContent(); 
       $data = (!empty($data))? get_object_vars(json_decode($data)) : '';
        $taskto=$data['task_to'];
        $taskdetail=$data['task_detail'];
        $em = $this->getEntityManager();
        $queryBuilder = $em->createQueryBuilder();
        $queryBuilder->select('o.projectname,o.description,o.id,IDENTITY(o.user) as user_id')->from('Project\Entity\Project', 'o')
                 ->where('o.user = :task_to')
                 ->setParameter('task_to', $taskto);
         $result = $queryBuilder->getQuery();
         $getdata=$result->getResult();
         $projectuserID=$getdata[0]['user_id'];
        $logged_in_user_details = array();
        $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
        if($authService->hasIdentity()){
            $user = $authService->getIdentity();
            $logged_in_user_details = $user->toArray();            
        }
        $id=$logged_in_user_details['id'];        
        $user = $this->getEntityManager()->getRepository('User\Entity\User')->find($id);
        $createmsg = new \Task\Entity\Task($data); 
        $data['task_from'] = $user;
        
        $currentDateTime = date('Y-m-d H:i:s');
        $data['date']=$currentDateTime;
        $data['task_status']='assigned';
        //print_r($currentDateTime); exit();
        //$data['task_from']=$user;
       // $projectEntity = $createmsg->exchangeArray(array('user_id'=>$user,'task_to'=>$projectuserID,'task_detail'=>$taskdetail));
        $projectEntity = $createmsg->exchangeArray($data);
        $this->getEntityManager()->persist($projectEntity);
        $this->getEntityManager()->flush(); 
         return new JsonModel(array('status'=>'ok'));
    }
    
    public function update($id, $data){
        // Action used for PUT requests
        $user = $this->getEntityManager()->getRepository('Task\Entity\Task')->find($id);
        //print_r($user); exit();
        $user->set($data);
        $user->validate($this->em);        
        $this->getEntityManager()->flush();        
        return new JsonModel($user->toArray());
    }
    
    public function taskCompletedAction(){   
        
        // Action used for GET requests with resource Id    
        $logged_in_user_details = array();
        $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
        if($authService->hasIdentity()){
            $user = $authService->getIdentity();
            $logged_in_user_details = $user->toArray();            
        }
        $id=$logged_in_user_details['id'];
        $completed='completed';
        $em = $this->getEntityManager();
        $queryBuilder = $em->createQueryBuilder();
        $queryBuilder->select('o.task_detail,o.date')->from('Task\Entity\Task', 'o')
                 ->where('o.task_to = :task_to', 'o.task_status = :task_status')
                 ->setParameter('task_to', $id)
                 ->setParameter('task_status', $completed);
         $result = $queryBuilder->getQuery();
         $getdata=$result->getResult();
         echo json_encode($getdata);
         return new JsonModel(array('status'=>'ok'));
        
    }
    
    
    public function allCompletedTaskAction(){   
        
        // Action used for GET requests with resource Id    
       
        $completed='completed';
        $em = $this->getEntityManager();
        $queryBuilder = $em->createQueryBuilder();
        $queryBuilder->select('o.task_detail,o.date')->from('Task\Entity\Task', 'o')
                 ->where('o.task_status = :task_status')
                 ->setParameter('task_status', $completed);
         $result = $queryBuilder->getQuery();
         $getdata=$result->getResult();
         echo json_encode($getdata);
         return new JsonModel(array('status'=>'ok'));
        
    }
    
    


}