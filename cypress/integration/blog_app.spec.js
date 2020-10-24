describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'daz',
      username: 'daz',
      password: 'daz',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
    cy.contains('login')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('daz')
      cy.get('#password').type('daz')
      cy.get('#login-button').click()

      cy.contains('login success')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('daz')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'login success')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'daz', password: 'daz' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#create-blog').click()
      cy.contains('Test title')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test title',
          author: 'Test author',
          url: 'Test url',
        })
      })

      it('it can be liked', function () {
        cy.get('#button-view').click()
        cy.get('#button-like').click()
        cy.contains('likes 1')
      })

      it('it can be deleted by the user who created it', function () {
        cy.get('#button-view').click()
        cy.get('#button-remove').click()
        cy.get('html').should('not.contain', 'Test title')
        cy.get('.success').should('contain', 'blog removed')
      })

      it('it cannot be deleted by a user who did not created it', function () {
        const user = {
          name: 'bum',
          username: 'bum',
          password: 'bum',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.login({ username: 'bum', password: 'bum' })
        cy.get('#button-view').click()
        cy.get('#button-remove').should('not.be.visible')
      })

      describe('and multiple blogs exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Title 2',
            author: 'Author 2',
            url: 'Url 2',
            likes: 5,
          })
          cy.createBlog({
            title: 'Title 3',
            author: 'Author 3',
            url: 'Url 3',
            likes: 6,
          })
        })

        it('blogs are ordered according to likes, with the blog with the most likes being first', function () {
          cy.get('.blog-likes').then(($likes) => {
            let likesArray = $likes.toArray().map((el) => {
              return Cypress.$(el).text()
            })
            cy.wrap(likesArray).should('equal', likesArray.sort())
          })
        })
      })
    })
  })
})
