const LessonList = {
  props: ['lessons', 'searchQuery', 'sort'],
  emits: ['addToCart', 'toggleOrder', 'update:searchQuery', 'update:sort'],
  template: `
    <div>
      <div class="row mb-3">
        <div class="col-md-5 mb-2">
          <input :value="searchQuery" 
                 @input="$emit('update:searchQuery', $event.target.value)"
                 type="search" 
                 class="form-control"
                 placeholder="Search lessons (search-as-you-type)">
        </div>
        <div class="col-md-4 mb-2">
          <div class="input-group">
            <label class="input-group-text" for="sortBy">Sort by</label>
            <select id="sortBy" 
                    :value="sort.by" 
                    @change="$emit('update:sort', {...sort, by: $event.target.value})" 
                    class="form-select">
              <option value="subject">Subject</option>
              <option value="location">Location</option>
              <option value="price">Price</option>
              <option value="spaces">Spaces</option>
            </select>
            <button class="btn btn-outline-secondary" @click="$emit('toggleOrder')">
              <i :class="sort.order==='asc'?'fa-solid fa-arrow-up':'fa-solid fa-arrow-down'"></i>
            </button>
          </div>
        </div>
        <div class="col-md-3 text-md-end">
          <small class="text-muted">Showing <strong>{{lessons.length}}</strong> lessons</small>
        </div>
      </div>

      <div class="row g-3">
        <template v-if="lessons.length">
          <div class="col-md-6 col-lg-4" v-for="lesson in lessons" :key="lesson.id">
            <div class="card h-100" style="min-height: 180px;">
              <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between mb-2">
                  <h5 class="card-title mb-0">{{lesson.subject}}</h5>
                  <i :class="lesson.icon"></i>
                </div>
                <p class="text-muted mb-1">
                  <i class="fa-solid fa-location-dot me-1"></i>{{lesson.location}}
                </p>
                <p><strong>£{{lesson.price.toFixed(2)}}</strong></p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                  <span class="badge bg-info text-dark">Spaces: {{lesson.spaces}}</span>
                  <button class="btn btn-sm btn-primary"
                          :disabled="lesson.spaces===0"
                          @click="$emit('addToCart', lesson)">
                    <i class="fa-solid fa-cart-plus me-1"></i>Add
                  </button>
                </div>
                <small v-if="lesson.spaces===0" class="text-danger mt-1">No spaces left</small>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="col-12">
          <div class="alert alert-warning">No lessons found.</div>
        </div>
      </div>
    </div>
  `
};