# Milestone II Submission
https://orbital-digital-it.herokuapp.com

## Team Name
DigitalIT

## Proposed Level of Achievement
Apollo 11

## Motivation
Digitalizing one's business is often regarded as the most fundamental thing we should do in today's world. From setting up a seller account in Instagram, Facebook, Shoppee, hiring influencers to review and promote our products and services, using online finance and banking tools in keeping track of our business performance - the list is never ending!

Yet the abundant digital resources that are scattering in the App Store seem to have left those with the least knowledge and experience in the online market with confusion. Particularly in Indonesia, where you could find almost every app for any needs. There are so many choices, and ultimately, we are left with decision questions: Where should I set up my seller profile? Tokopedia? Shoppee? Instagram? Facebook? or _maybe_, Tinder?! Should I just choose everything? But how do I manage all those accounts??

We are determined to help answers those questions. Just as the PwC, McKinsey and BCG to giant corporations in the world, we aim to be a personal consultant to these small business owners. We are trying to integrate the consulting services into our end product, perhaps testing on how machine learning could help in decision making process. Once we are able to do so, this web application could potentially automate the business consulting practice.

## Vision
DigitalIT will be a web application focusing on making decisions and generating recommendations on growth strategy based on the user's business profile and condition. We are starting from basic feature such as determining suitable e-commerce platform based on the business business_category (fashion, electronics or culinary). But ultimately, we are aiming for DigitalIT to be able to generate much more advanced recommendations - similar to those generated by professional business consultants.

## User Stories
1. As a business owner, I want to grow my business.
2. As a business owner, I want to digitalize my business.
3. As a business owner, I want to know how to digitalize my business.
4. As a business owner, I want to know what digital tools are the best for my business.
5. As a business owner, I want to gain insights from my business performance.
6. As a business owner, I want to make decision based on my current business performance.
7. As a business owner, I want to know the best strategies to grow my business indefinitely.
8. As a business owner, I want to have a web application that I can use intuitively without being confused.

## User Profiling
### User Profile
- Age: 10 - 15 or > 45, particularly those with limited knowledge in digital business
- Gender: any
- Location: Indonesia
- Occupation: small business owner
- Characteristic: generally unable to afford any external consulting services and must rely on one self
- Motivations:
  * Grow their business, especially in the digital aspect, to increase profit
  * Achieving this through making sound decisions and implementing relevant strategies
  * Gaining satisfaction and feeling empowered from successfully increasing their business sales

### Drawing from Examples
- Acquaintances who have relevant experiences in digitalizing business -> business owners usually ask for free advices from their peers who are deemed to be more senior in the digital field
- Friends and family -> business owners usually ask the people they trust to help setting up and maintaining their seller accounts
- McKinsey & Company, Boston Consulting Group, E&Y -> these are reputable consulting companies that help their clients make sound decisions

### Summary
We have identified two layers of motivation in our users, translating to two long-term focus areas in our value proposition.

**Motivation**
1. Digitalize their business
2. Grow their business

**Focus areas**
1. Recommendation on suitable tools in digitalizing their business
2. Track their business performance and generate growth strategies

## Scope of Project
DigitalIT is a web application that acts as personal business consultant for business owners. Users can enter their business particulars and there will be generated recommendation that they can choose to implement. As their business gradually grow, users can update their business data and DigitalIT will continue to generate strategies that they could follow.

DigitalIT features are outlined in the following sections, organized by the following tags:
- **Proposed** - features for Minimum Viable Product (MVP) by Splashdown
- **Current Progress** - elaboration on current progress of specific features
- **Additional Features** - Add-on features to improve after MVP is completed

## Features

### Sign up and log in

**Proposed** - users can access their account by several procedures:
1. Sign up
2. Log in
3. Forgot password

**Current Progress**
Milestone 1: We have finished the design of Sign up, Log in and Forgot password pages using Figma. Currently we have the working form of Signup and Log in with basic styling.
Milestone 2: We have finished creating and deploying the feature for Sign up, Login and authentication of users.

**Additional Features** - users can read and agree on these pages before signing up:
1. Terms and conditions
2. Privacy policy

### Entering business particulars and data

**Proposed** - a form that enables users to key in business information such as:
1. Business name
2. Focus area or business_category
3. Current progress of digitalization
4. Products and services information such as types, prices, COGS and markup
5. Financial report (users can input their sales performance)
6. Inventory (goods condition, expiry date, cost)

This is the very first task that the users need to complete in order to be able to use our service. This data will then be stored in DigitalIT database and will be used to generate insights and recommended strategies.

**Current Progress**
Milestone 1:
A form that enables users to key in business information such as:
1. Business name
2. Focus area or business_category

Milestone 2:
A form that enables users to key in business information such as:
1. Business name (text based)
2. Focus area or business_category (dropdown)
3. Current progress of digitalization (dropdown)
4. Product and services information such as name, description, price and cost (text and number based)
5. Store information such as platforms the user currently use to sell the goods (dropdown)

The information is able to be stored automatically on the DigitalIT database. The database design and backend for viewing, editing and deleting these information have also been built.


**Additional Feature** - improve the user experience and accuracy of the data by adding functionality to accomodate for:
1. Automatic integration of data, if the users have previously stored their business financial data in other applications such as Microsoft Excel, Buku Kas and other bookkeeping applications
2. Automatic integration of products, services and inventory available, if the users have already keyed in similar information in e-commerce platforms
3. Traffic data from platforms such as social media and e-commerce

### Personalized business recommendation

**Proposed** - based on the provided information, we can generate recommendations for:
1. E-commerce platform
3. Financial tools, such as digital banking and bookkeeping application
4. Social media
5. Strategies and next steps to be taken

The recommendations will be updated indefinitely to suit the business condition that changes from time to time, which in turn will be reflected once the users update their data. The recommendations will also require users to update their progress, such as telling DigitalIT which platforms they decide to use and the sales generated from each platform. Ultimately, the concept will follow a mission-based game system, in which users are required to continue on hitting each milestone before moving on to the next part.

**Current Progress** 
Milestone 1:
We are providing basic recommendations on e-commerce platforms based on the business type using dropdowns menu and simple if-else algorithm.
Milestone 2:
We disabled the previous feature progress to be able to work on the improvised version with machine learning.

**Additional Feature** - we are hoping to integrate machine learning into our algorithm to allow for more precise recommendations to enhance business in aspects such as digital marketing and pricing strategies. For example, DigitalIT will be able to retrieve information on prices of similar products offered by our users and recommend on suitable pricing tiers to optimize profit.

### Tracking business performance

**Proposed** - based on the provided financial data, we can automatically generate insights such as:
1. Current revenue, cost and profit
2. Comparison of growth progress (weekly, monthly or yearly)
3. Financial ratio analysis that determines the liquidity, solvency and profitability of a business

The generated result will be in a easy-to-understand charts and tables, as we want to cater for business owners who might not understand these definitions. In addition, we will also provide a simple interpretation such as, "Your business is doing great!" or "Your growth is declining."

**Current Progress** - we have yet to bring this feature into realization. However, we have obtained the knowledge to perform these financial calculations.

**Additional Feature** - we are hoping to increase functionality by bringing these features:
1. Ready to download PDF or Excel file of the financial report and analysis
2. Tax report based on the financial data
3. Financial ratio analysis that determines the efficiency and market prospects of a business

### Other features

**Proposed**
1. Need Help section for users to key in their difficulties regarding the web application itself or other aspects of their business that is not yet covered by DigitalIT functionality. The response generated will be based on manual observation.

**Current Progress** - we have completed the design for Need Help section on Figma, but have yet to build the working technical proof.

**Additional Feature**
1. Review and Discussion section for users to key in their concerns and issues with the recommended platforms or other general topics. Users can communicate with other users in this section, creating an "asking for an advice" environment.
2. Ideation section for users who have yet to build their business. This section will help users in decision making process from scratch.


## Diagram

### Current Implementation

### Project and Database Design Map
![image](https://user-images.githubusercontent.com/76247368/170954200-661d741f-6d82-4db0-a415-c396a49f899f.png)

### Backend Sturcture
![image](https://user-images.githubusercontent.com/76247368/170954238-049688a1-ce00-4980-b634-9415d3136fe3.png)

### React, API and Database Mapping
![image](https://user-images.githubusercontent.com/76247368/170954268-2b79e51e-b41e-467b-ae88-b3f74430d083.png)


## Tech Stack

### Heroku
Online database to store information and deploy our web application.

### GitHub
Collaborate, version control and organize our workflow.

### Express + Node.js
Build the backend and control the server routing. request, etc.

### Figma
Build design prototype and customized elements.

### React
Build user interfaces for our web application.

### PostgreSQL
Primary database.


## Software Engineering Principles

### Project Management
We make use of GitHub Projects (classic) for organizing tasks into 3 business_category: To Do, In Progress and Done. We are still new to this GitHub feature, so hopefully we will be able to implement a more sophisticated project management in future work.


### Version Control
We make use of Git and GitHub for version control of our product. Currently we have 107 commits on the main branch, 16 pull requests (closed), 5 issues (closed) and 9 branches. We assign each other as reviewers, put labels, projects  and milestones on each pull request and issues to make sure we are always updated on each other's work.


### Continuous Deployment
We have opted to host our database and web application on Heroku.


## Quality Assurance

### Manual Testing

Smoke Testing - 
We perform smoke testing whenever a new feature or improvement is added to the main branch to ensure that the new feature is working. Testing is usually done directly through the web application after deployment. Before deployment, we use Postman to test the server and routing connection.

Regression Testing - 
We perform regression testing whenever a new feature or improvement is added to the main branch to ensure that all the previous features are still working. Testing is usually done by several steps:
1. Work on a separate branch for new feature
2. Make a pull request in GitHub and assign another member as reviewer. Reviewer then reviews the changes (addition and deletion) made to the code and solve conflicts
3. Test all the existing and new features are working properly using Postman and/or deploy the branch using Heroku
4. If all features are working fine, merge the branch to the main and it will be continuously deployed
5. Test again by visiting the deployed link on another devices or at later time

## Automated Testing
Not available. We plan on setting up automated testing  by using features available on Postman.

## Limitations
In this section, we would like to discuss various problems and constraints that we face during the development process. Some of these limitations result from our own choices, while some are inevitable.
### Heroku Free Version
Since we host our database using Heroku free-tier plan, there will be limitations on the type of testing that we can perform.
### Slow Progress
We opt for a ???traditional??? tech stack and try to code everything from scratch for a better learning experience. Therefore it usually takes us a while to build, integrate and deploy new features.
### Time Constraint
It may be due to the lack of our time management skill, but we do feel like we are lacking behind our plan. We have not yet implemented our most essential feature, and might not be able to bring the [ Additional Features ] into realization. However, we do plan to make more efforts for the next milestone.


## Conclusion
While we are not really satisfied with our performance for this milestone, we still believe that we will be able to complete the proposed features by Milestone 3 / Splashdown. Aspects that we would like to improve in the next milestone are as follow:
### Better code
We would like to improve our code efficiency and readability by enhancing its structure, usage and documentation.
### Better design
Our web application is still using the Bootstrap pre-made design with modifications to suit our needs. We would like to make further modifications to introduce customized elements and increase our identity.
### Better workflow
We would like to exploit more of the GitHub features to increase our collaboration effort. Some of them include CI/CD, Actions and Projects.
### Better feature
Bugs-free and achieve our goals.


# Appendix
Refer to this [document](https://docs.google.com/document/d/1xibS-kvBRR_ODVdeFJM3MOX6dzGsIJrJ/edit?usp=sharing&ouid=103654914173748571741&rtpof=true&sd=true) for more detailed README.
