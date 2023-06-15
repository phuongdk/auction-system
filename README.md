# Jitera Auction System

<!-- TABLE OF CONTENTS -->
<details open>
  <summary style="font-size: 25px; margin-bottom: 15px;">Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#project-architecture">Project Architecture</a></li>
        <li><a href="#features-cover">Features Cover</a></li>
      </ul>
    </li>
    <li>
      <a href="#instruction-to-run">Instruction to run</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#running-the-app">Running the app</a></li>
      </ul>
    </li>
    <li><a href="#production-environment">Production Environment</a></li>
    <li><a href="#faqs">FAQs</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

### Project Architecture
I choose modern architecture approach for the application.

### Stacks as follow:
* Client-server model: Client-side application approach.
* Authentication: Stateless.
* Token: Bearer Token (JWT).
* Frontend stacks: vite, react, axios, typescript, material-ui.
* Backend stacks: nestjs, typescript, typeORM.
* Database: Postgresql.
* Deployment stacks: docker, docker-compose, AWS EC2, AWS Route53, nginx.

### Database Diagrams:
https://dbdiagram.io/d/6489f117722eb77494f7a6f7

### Features Cover

* Login.
* Signup.
* Logout.
* List bid items and your items.
* Deposit Money.
* Create a new item.
* Publish an item.
* Bid an item.
* Delete an item.
* Refresh price.
* Bid interval 5s.
* Bid and balance calculation.
* Item countdown till expires.
* Transfer successful bid item.
* Payback failed bid money.
* General input datas validation.

## Instruction to run
### Prerequisites
I have configured all resources needed to run the application, all you need is to install docker and docker-compose on your machine.

Example for Linux environment:

Install docker: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04

Install docker-compose: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04

### Running the app
From project root

Boot up application and dependencies
```bash
$ docker-compose up -d
```

Rebuild and boot up application (If you want to rebuild the application from docker images)
```bash
$ docker-compose up -d --build
```

Shutdown application (datas store in database will be gone)
```bash
$ docker-compose down -v
```

Stop services
```bash
$ docker-compose stop
```

Start services
```bash
$ docker-compose start
```
## Production Environment
Application live at: https://jitera-auction-system.phuongdk.io/

Infrastructures underneath backed by AWS

## FAQs

#### Why client-side approach?
Client-side application allow you to create decoupled application with ease.

#### Why staless authentication?
Stateless authentication allow you to scale the application easier in long-term, suitable for microservices architecture in the future.

#### Why postgres?
Postgresql is a relational database, really good for relationship between entities and support ACID properties with transaction for dealing with money.

#### Why docker?
Docker is a containerization tool, great for isolate environment and prevent environment issues regardless of which machine you are on.

#### Why AWS?
I have around 1.5 years of experience with AWS and two certifications. By leveraging the familiarity and resources on my AWS account, it can help me deploy the application easier on this cloud platform.

## License

Vite and Nest are [MIT licensed](LICENSE).