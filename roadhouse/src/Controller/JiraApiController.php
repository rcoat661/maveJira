<?php


namespace App\Controller;

use App\Service\JiraApi;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class JiraApiController extends AbstractController
{
    private $jiraApi;

    public function __construct(JiraApi $jiraApi)
    {
        $this->jiraApi = $jiraApi;
    }

    public function getProjects()
    {

        $projects = $this->jiraApi->getAllProjects();

        return $this->json($projects);
    }

}
