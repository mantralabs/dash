<?php
namespace Project\Entity;
use Doctrine\ORM\Mapping as ORM;

use User\Entity\Base;

/** @ORM\Entity */
class ProjectMember extends Base
{
    /**
    * @ORM\Id
    * @ORM\GeneratedValue(strategy="AUTO")
    * @ORM\Column(type="integer")
    */
    protected $id;    
    
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
    
       
   public function exchangeArray($data = array())  {
        foreach($data as $key => $value){
            $this->$key = $value;
        }
        return $this;
    }
}