<?php
namespace User\Controller;
 
use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
 
class UserController extends AbstractRestfulController
{
	protected $userTable;

	public function registerAction(){
		echo "sdfasdf"; die;
	}
	
	public function loginAction(){
		echo "login"; die;
	}
	
    public function getList()
    {    	
       	$results = $this->getUserTable()->fetchAll();
	    $data = array();
	    foreach($results as $result) {
	        $data[] = $result;
	    }
   		return new JsonModel(array(
    		'data' => $data)
   		);
    }
 
	public function get($id)
	{
	    $user = $this->getUserTable()->getUser($id);
	 
	    return new JsonModel(array(
    		'data' => $user)
   		);
	}
 
    public function create($data)
    {
    	echo "test"; die;
        # code...
    }
 
    public function update($id, $data)
    {
        # code...
    }
 
    public function delete($id)
    {
        # code...
    }
    
    public function getUserTable()
    {
    	if (!$this->userTable) {
    		$sm = $this->getServiceLocator();
    		$this->userTable = $sm->get('User\Model\UserTable');
    	}
    	return $this->userTable;
    }
}