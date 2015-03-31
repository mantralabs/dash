<?php
namespace Message\Controller;

use Message\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
//use \Exception;


class MessageController extends AbstractRestfulJsonController{

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
          $users = $this->getEntityManager()->getRepository('Message\Entity\Message')->findAll();
          $users = array_map(function($message){
            return $message->toArray();
        }, $users);
        return new JsonModel($users);
     }
     
      public function get($id){   
        // Action used for GET requests with resource Id
        $user = $this->getEntityManager()->getRepository('Message\Entity\Message')->find($id);
        return new JsonModel(
            $user->toArray()
        );
    }
     
    public function create($data){
       // print_r($data); exit();
        //echo 'jhd'; exit();
        $this->getEntityManager();
        $createmsg = new \Message\Entity\Message($data);
        $createmsg->validate($this->em);
        $this->getEntityManager()->persist($createmsg);
        $this->getEntityManager()->flush(); 
         return new JsonModel(array('status'=>'success'));
    }
    
    
      public function update($id, $data){
        // Action used for PUT requests
       // print_r($data);
        $user = $this->getEntityManager()->getRepository('Message\Entity\Message')->find($id);
        $user->set($data);
        $user->validate($this->em);
        
        $this->getEntityManager()->flush();
        
        return new JsonModel($user->toArray());
    }

    public function delete($id){
        // Action used for DELETE requests
        $user = $this->getEntityManager()->getRepository('Message\Entity\Message')->find($id);
        $this->getEntityManager()->remove($user);
        
        $this->getEntityManager()->flush();
        
        return new JsonModel($user->toArray());
    }


}