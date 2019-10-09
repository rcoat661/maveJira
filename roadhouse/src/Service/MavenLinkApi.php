<?php


namespace App\Service;

require_once __DIR__ . '/../../vendor/mavenlink/mavenlink_php_api/lib/mavenlink_api.php';

class MavenLinkApi
{
    private $api_connection;

    public function __construct()
    {
        $this->api_connection = new \MavenlinkApi('811892e220f490932ec2d9b0d4fe5041200c18e1c04b5a9d9874038251915d1a');
    }

    public function getAllWorkSpacesJson()
    {
        return $this->api_connection->getWorkspaces();
    }
}
