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
    protected $username; 
    
    /** 
     * @ORM\Column(type="string", length=50)
     */
    protected $password;    
    
    /** 
     * @ORM\Column(type="string", length=20) 
     */
    protected $role;
    
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

    public function getInputFilter($em){
        if (!$this->inputFilter) {
            $inputFilter = new InputFilter();
 
            $inputFilter->add(array(
                'name'     => 'fname',
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
                            'min'      => 5,
                            'max'      => 100,
                        ),
                    ),
                ),
            ));
 
            $inputFilter->add(array(
                'name'     => 'lname',
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
                            'max'      => 100,
                        ),
                    ),
                ),
            ));
 
            $inputFilter->add(array(
                'name'     => 'password',
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
                            'max'      => 100,
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
}