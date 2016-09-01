<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


class CheckoutController extends Controller
{
    /**
     * @Route("/cart", name="cart")
     */
    public function cartAction(Request $request)
    {
        return $this->render('AppBundle:Checkout:cart.html.twig', array(
                // ...
            ));    }

}
