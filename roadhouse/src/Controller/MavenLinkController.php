<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\MavenLinkApi;

class MavenLinkController extends AbstractController
{

    private $mavenLinkApi;

    public function __construct(MavenLinkApi $mavenLinkApi)
    {
        $this->mavenLinkApi = $mavenLinkApi;
    }

    /**
     * @Route("/maven/link", name="maven_link")
     */
    public function index()
    {
        return $this->render('maven_link/index.html.twig', []);
    }

    public function listAllProjects()
    {
        return new Response($this->mavenLinkApi->getAllWorkSpacesJson());
    }
}
