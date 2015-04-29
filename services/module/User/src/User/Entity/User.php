<?php
namespace User\Entity;
use Doctrine\ORM\Mapping as ORM;
use User\Entity\Base;

use Zend\InputFilter\InputFilter;


/** @ORM\Entity */
class User  extends Base
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
    protected $name; 
    
    /** 
     * @ORM\Column(type="string", length=50,nullable=true)
     */
     
    protected $phone; 
    
    /** 
     * @ORM\Column(type="string", length=50,nullable=true)
     */
     
    protected $photo; 

    /** 
     * @ORM\Column(type="string", length=50,nullable=true)
     */
     
    protected $designation; 
    
    /** 
     * @ORM\Column(type="string", length=50,nullable=true)
     */
      
    protected $password;    
    
    /** 
     * @ORM\Column(type="string", length=20,nullable=true) 
     */
    public $role;
    
    /** 
     * @ORM\Column(type="string", length=100) 
     */
    protected $email;  
    
    /** 
     * @ORM\Column(type="string",nullable=true) 
     */
    protected $hash;
    
    
    /**
     * Convert the object to an array.
     *
     * @return array
     */
   
    
    public function __construct($data){
        parent::__construct($data);
    }

    public function getFullName(){
        return $this->fname . " " . $this->lname;
    }

    public function getAddress(){
        return $this->address;
    }
    public function getPassword(){
        return $this->password;
    }

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
                'name'     => 'password',
                'required' => false,
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
            
            $inputFilter->add(array(
                'name'     => 'role',
                'required' => false,
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
                            'max'      => 20,
                        ),
                    ),
                ),
            ));

 
            $this->inputFilter = $inputFilter;
        }
 
        return $this->inputFilter;
    }
    
    public function getLoginInputFilter($em){
        if (!$this->inputFilter) {
            $inputFilter = new InputFilter();
            
            $inputFilter->add(array(
                'name'     => 'password',
                'required' => false,
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
                ),
            ));
            $this->inputFilter = $inputFilter;
        }
 
        return $this->inputFilter;
    }
    
     public function exchangeArray($data = array()){
        foreach($data as $key => $value){
            $this->$key = $value;
        }
        return $this;
    }
}