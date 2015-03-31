<?php
namespace Activity\Entity;
use Doctrine\ORM\Mapping as ORM;

use Zend\InputFilter\InputFilter;


/** @ORM\Entity */
class Activity 
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
    protected $activity_detail; 
    /**
     * @ORM\ManyToOne(targetEntity="User\Entity\User",cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     **/
    protected $user_id; 
    /**
     * @ORM\ManyToOne(targetEntity="Project\Entity\Project",cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id")
     **/   
    protected $project_id; 
    /** 
     * @ORM\Column(type="string")
     */
    protected $date;
    

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
                'name'     => 'activity_detail',
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
                            
            $this->inputFilter = $inputFilter;
        }
 
        return $this->inputFilter;
    }
       
}