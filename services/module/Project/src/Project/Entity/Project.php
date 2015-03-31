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
        unset($vars['em']);
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
       
}