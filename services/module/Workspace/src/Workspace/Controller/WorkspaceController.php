<?php
namespace Workspace\Controller;

use Workspace\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
//use \Exception;


class WorkspaceController extends AbstractRestfulJsonController{

    protected $em;
    
    public function getEntityManager(){
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('doctrine.entitymanager.orm_default');
        }
        return $this->em;
    }

    public function indexAction(){
        echo 'hai'; exit();
    }
    
     public function getList()     {
          $users = $this->getEntityManager()->getRepository('Workspace\Entity\Workspace')->findAll();
          $users = array_map(function($workspace){
            return $workspace->toArray();
        }, $users);
        return new JsonModel($users);
     }
     
      public function get($id){   
        // Action used for GET requests with resource Id
        $user = $this->getEntityManager()->getRepository('Workspace\Entity\Workspace')->find($id);
        return new JsonModel(
            $user->toArray()
        );
    }
     
    public function create($data){
        $this->getEntityManager();
        $createmsg = new \Workspace\Entity\Workspace($data);
        $createmsg->validate($this->em);
        $this->getEntityManager()->persist($createmsg);
        $this->getEntityManager()->flush(); 
         return new JsonModel(array('status'=>'ok'));
    }
    
    
      public function update($id, $data){
        // Action used for PUT requests
        $user = $this->getEntityManager()->getRepository('Workspace\Entity\Workspace')->find($id);
        $user->set($data);
        $user->validate($this->em);
        
        $this->getEntityManager()->flush();
        
        return new JsonModel($user->toArray());
    }

    public function delete($id){
        // Action used for DELETE requests
        $user = $this->getEntityManager()->getRepository('Workspace\Entity\Workspace')->find($id);
        $this->getEntityManager()->remove($user);
        
        $this->getEntityManager()->flush();
        
        return new JsonModel($user->toArray());
    }
    
     public function workspaceMemberCreateAction(){
        $data = $this->getRequest()->getContent();
        if(!empty($data)){
             return new JsonModel(array('status'=>'Enter user and project ID'));
        }
        $data = (!empty($data))? get_object_vars(json_decode($data)) : '';
        $userid=$data['user_id'];
        $workspaceid=$data['workspace_id'];
        $user = $this->getEntityManager()->getRepository('User\Entity\User')->find($userid);
        //print_r($user); exit();
        $workspace = $this->getEntityManager()->getRepository('Workspace\Entity\Workspace')->find($workspaceid);
        if($workspace == "" || $user == ""){
             return new JsonModel(array('status'=>'Enter proper user and workspace ID'));
        }
        else{
        $createmsg1 = new \Workspace\Entity\WorkspaceMember($data);
        $projectMember = $createmsg1->exchangeArray(array('user_id'=>$user, 'workspace_id'=>$workspace));
        $this->getEntityManager()->persist($projectMember);
        $this->getEntityManager()->flush(); 
        return new JsonModel(array('status'=>'success'));
       }

     }
}