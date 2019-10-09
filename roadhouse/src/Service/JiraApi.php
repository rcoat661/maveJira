<?php


namespace App\Service;

use JiraRestApi\Configuration\ArrayConfiguration;
use JiraRestApi\Issue\IssueService;
use JiraRestApi\Project\ProjectService;

class JiraApi
{

    private $creds;

    public function __construct()
    {
        $this->creds = new ArrayConfiguration([
            'jiraHost' => 'https://genuine.atlassian.net',
            'jiraUser' => 'cbarrett@wearegenuine.com',
            'jiraPassword' => '6ZIHOIeNl1GTmFIb7h6ID4EC',
        ]);
    }

    public function getAllProjects()
    {
        $proj = new ProjectService($this->creds);

        return $proj->getAllProjects();
    }

}
