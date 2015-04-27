<?php
namespace Contact\Entity;
use Doctrine\ORM\Mapping as ORM;

use User\Entity\Base;
use Zend\InputFilter\InputFilter;


/** @ORM\Entity */
class Contact 
{


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

  /**
    * @ORM\Id
    * @ORM\GeneratedValue(strategy="AUTO")
    * @ORM\Column(type="integer")
    */
    protected $id;
     /** 
     * @ORM\Column(type="string", length=50)
     */
    public $name; 
      /** 
     * @ORM\Column(type="string", length=50)
     */
    public $email; 
    /**
     * @ORM\ManyToOne(targetEntity="Workspace\Entity\Workspace",cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="workspace_id", referencedColumnName="id")
     **/
    protected $workspace_id;
    
     /**
     * @ORM\ManyToOne(targetEntity="User\Entity\User",cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     **/
    protected $user_id;
    
    public function getInputFilter($em){
        if (!$this->inputFilter) {
            $inputFilter = new InputFilter();
 
            $inputFilter->add(array(
                'name'     => 'name',
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
                            'min'      => 6,
                            'max'      => 50,
                        ),
                    ),
                ),
            )); 
            
         

            $inputFilter->add(array(
                'name'     => 'email',
                'required' => true,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'EmailAddress',
                    ),
                    array(
                        'name'  => 'User\Validator\NoEntityExists',
                        'options'=>array(
                            'entityManager' =>$em,
                            'class' => 'User\Entity\User',
                            'property' => 'email',
                            'exclude' => array(
                                array('property' => 'id', 'value' => $this->getId())
                            )
                        )
                    )
                ),
            ));
            
         
 
            $this->inputFilter = $inputFilter;
        }
 
        return $this->inputFilter;
    }
     
     
       public function exchangeArray($data = array()) 
    {
        foreach($data as $key => $value){
            $this->$key = $value;
        }
        return $this;
    }
      
}