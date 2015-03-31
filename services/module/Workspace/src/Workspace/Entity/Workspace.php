<?php
namespace Workspace\Entity;
use Doctrine\ORM\Mapping as ORM;
use User\Entity\Base;

use Zend\InputFilter\InputFilter;



/** @ORM\Entity */
class Workspace extends Base
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
    protected $workspace_name; 
    
    public function __construct($data){
        parent::__construct($data);
    }
    
    public function getInputFilter($em){
        if (!$this->inputFilter) {
            $inputFilter = new InputFilter();
 
            $inputFilter->add(array(
                'name'     => 'workspace_name',
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
            
            $this->inputFilter = $inputFilter;
        }
 
        return $this->inputFilter;
    }
    
}