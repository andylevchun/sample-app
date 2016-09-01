<?php

namespace AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CheckoutControllerTest extends WebTestCase
{
    public function testCart()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/cart');
    }

}
