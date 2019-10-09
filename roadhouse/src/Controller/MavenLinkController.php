<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

require_once __DIR__ . '/../../vendor/mavenlink/mavenlink_php_api/lib/mavenlink_api.php';

class MavenLinkController extends AbstractController
{
    /**
     * @Route("/maven/link", name="maven_link")
     */
    public function index()
    {
        $mavenlinkApi = new \MavenlinkApi('811892e220f490932ec2d9b0d4fe5041200c18e1c04b5a9d9874038251915d1a');

        $workspaces_json = $mavenlinkApi->getWorkspaces();

        return $this->render('maven_link/index.html.twig', [
            'workspaces' => $workspaces_json,
        ]);
    }
}
