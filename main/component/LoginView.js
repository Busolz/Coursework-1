const LoginView = {
  props: ['error'],
  emits: ['login', 'switchRegister'],
  data() {
    return { 
      email: '', 
      password: '' 
    };
  },
  template: `
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4" style="width: 22rem;">
        <h4 class="text-center mb-3">Login</h4>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label>Email</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <div class="text-center mt-3">
          <small>Don't have an account? 
            <a href="#" @click.prevent="$emit('switchRegister')">Register</a>
          </small>
        </div>
      </div>
    </div>
  `,
  methods: {
    login() {
      this.$emit('login', { 
        email: this.email, 
        password: this.password 
      });
    }
  }
};