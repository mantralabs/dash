<?php
namespace User\Entity;
use Doctrine\ORM\Mapping as ORM;
use User\Entity\Base;

use Zend\InputFilter\InputFilter;

/** @ORM\Entity */
class User
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
    
}