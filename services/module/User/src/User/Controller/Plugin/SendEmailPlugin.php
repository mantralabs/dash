<?php
/* 
* @author : Steffi <steffi@mantralabsglobal.com> 
* */
namespace User\Controller\Plugin;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Mvc\Controller\Plugin\AbstractPlugin;

use Zend\Mail;
use Zend\Mime\Message as MimeMessage;
use Zend\Mime\Part as MimePart;

class SendEmailPlugin extends AbstractPlugin
{
   public function sendemail($content= NULL, $fromAddress=NULL, $toAddress=NULL, $subject=NULL, $allowEmailDefault=true) {
       
        $config = $this->getController()->getServiceLocator()->get('Config');
        if(empty($config['allowEmail'])){ $allowEmail =  true; }  else { $allowEmail = false; }
        if(!($allowEmailDefault == false && $allowEmail == false)){
            $message = new \Zend\Mail\Message();        
            $body = '';
            $htmlPart = new MimePart($content);
            $htmlPart->type = "text/html";
            $textPart = new MimePart($body);
            $textPart->type = "text/plain";

            $body = new MimeMessage();
            $body->setParts(array($textPart, $htmlPart));
            $message->setBody($body);
            $message->setFrom($fromAddress);
            $message->addTo($toAddress);            
            $message->setSubject($subject);
            $smtpOptions = new \Zend\Mail\Transport\SmtpOptions();
            $smtpOptions->setHost('smtp.gmail.com')
                        ->setConnectionClass('login')
                        ->setName('smtp.gmail.com')
                        ->setConnectionConfig(array(
                                          /* 'username' => 'steffi@mantralabsglobal.com',
                                           'password' => 'Steffi1234',
                                           'ssl' => 'tls',*/
                                             'username' => 'razakballa@gmail.com',
                                           'password' => 'ilikeuandmeandall',
                                           'ssl' => 'tls',
                                         )
                                     );
            $transport = new \Zend\Mail\Transport\Smtp($smtpOptions);
            $transport->send($message); 
            return true;
        } else {
            return false;
        }
   }
}