<?php
namespace Task\Entity;
use Doctrine\ORM\Mapping as ORM;

use Zend\InputFilter\InputFilter;


/** @ORM\Entity */
class Task 
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
    protected $task_detail; 
       /**
     * @ORM\ManyToOne(targetEntity="User\Entity\User",cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="task_from", referencedColumnName="id")
     **/   
    protected $task_from;    
    
    /** 
     * @ORM\Column(type="integer")
     */       
    protected $task_to; 
    
    /** 
     * @ORM\Column(type="string")
     */
    protected $date;
    
    /** 
     * @ORM\Column(type="string")
     */
    protected  $task_status;


    public function toArray() {
        $vars = get_object_vars($this);
        unset($vars['em']);
        return $vars;
    }
    
    public function exchangeArray($data = array()) 
    {
        foreach($data as $key => $value){
            $this->$key = $value;
        }
        return $this;
    }
    
    public function getInputFilter($em){
        if (!$this->inputFilter) {
            $inputFilter = new InputFilter();
 
            $inputFilter->add(array(
                'name'     => 'taskdetail',
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
                            'min'      => 1,
                            'max'      => 1050,
                        ),
                    ),
                ),
            )); 
            
           
            
            $inputFilter->add(array(
                'name'     => 'task_to',
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
       
}