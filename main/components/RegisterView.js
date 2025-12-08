const RegisterView = {
  props: ['error'],            // accepts error messages as prop from parent
  emits: ['register', 'switchLogin'], // emits events upward to App
  data() {
    return { 
      name: '', 
      email: '', 
      password: '' 
    };
  },
  template: `
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4" style="width: 22rem;">
        <h4 class="text-center mb-3">Register</h4>
        <!-- emit register event with user object when form submitted -->
        <form @submit.prevent="register">
          <div class="mb-3">
            <label>Full Name</label>
            <input v-model="name" class="form-control" required />
          </div>
          <div class="mb-3">
            <label>Email</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
          <button type="submit" class="btn btn-success w-100">Register</button>
        </form>
        <div class="text-center mt-3">
          <small>Already have an account? 
            <!-- emit event to switch to login view -->
            <a href="#" @click.prevent="$emit('switchLogin')">Login</a>
          </small>
        </div>
      </div>
    </div>
  `,
  methods: {
    // emit register object to parent
    register() {
      this.$emit('register', { 
        name: this.name, 
        email: this.email, 
        password: this.password 
      });
    }
  }
};
