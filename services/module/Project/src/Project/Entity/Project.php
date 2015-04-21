<?php
namespace Project\Entity;
use Doctrine\ORM\Mapping as ORM;

use Zend\InputFilter\InputFilter;


/** @ORM\Entity */
class Project 
{
    /**
    * @ORM\Id
    * @ORM\GeneratedValue(strategy="AUTO")
    * @ORM\Column(type="integer")
    */
    protected $id;

    /** 
     * @ORM\Column(type="string", length=50)
     */
    protected $projectname; 
    
    /** 
     * @ORM\Column(type="string", length=50,nullable=true)
     */
    protected $description; 
    
    
    /**
     * @ORM\ManyToOne(targetEntity="User\Entity\User",cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     **/
     
    protected $user; 
    
    /**
     * @ORM\ManyToOne(targetEntity="Workspace\Entity\Workspace",cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="workspace_id", referencedColumnName="id")
     **/
    protected  $workspace_id;


    public function exchangeArray($data = array()) 
    {
        foreach($data as $key => $value){
            $this->$key = $value;
        }
        return $this;
    }
      public function toArray() {
        $vars = get_object_vars($this);
         unset(
            $vars['rawdata'], 
            $vars['inputFilter'],
            $vars['__initializer__'], 
            $vars['__cloner__'], 
            $vars['__isInitialized__']
        );
           foreach($vars as $key =>$val){
            if(is_object($val))
                $vars[$key] = $val->toArray();
        }
        return $vars;
    }
    
    public function getInputFilter($em){
        if (!$this->inputFilter) {
            $inputFilter = new InputFilter();
 
            $inputFilter->add(array(
                'name'     => 'projectname',
                'required' => true,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'StringLength',
                        'options' => array(
                            'encoding' => 'UTF-8',
                            'min'      => 3,
                            'max'      => 150,
                        ),
                    ),
                ),
            )); 
            
            $inputFilter->add(array(
                'name'     => 'description',
                'required' => true,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'StringLength',
                        'options' => array(
                            'encoding' => 'UTF-8',
                            'min'      => 3,
                            'max'      => 250,
                        ),
                    ),
                ),
            ));

                
            $this->inputFilter = $inputFilter;
        }
 
        return $this->inputFilter;
    }

     public function set($data){
        $this->rawdata = $data;        
        if(!empty($data)){
            $vars = get_class_vars(get_class($this));
            foreach($data as $key => $val){
                if(is_array($val) && array_key_exists($key, $vars)){
                    if(empty($this->$key)){
                        $className = __NAMESPACE__."\\".$key;
                        $val = new $className($val);
                    }else{
                        $obj = $this->$key;
                        $obj->set($val);
                        $val = $obj;
                    }
                    
                }
                $this->$key = $val;
            }
        } 
    }


       
}