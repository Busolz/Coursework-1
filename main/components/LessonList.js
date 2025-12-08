const LessonList = {
  props: ['lessons', 'searchQuery', 'sort'], // incoming data from App
  emits: ['addToCart', 'removeOne', 'toggleOrder', 'update:searchQuery', 'update:sort'],

  template: `
    <div>
      <div class="row mb-3">
        <div class="col-md-5 mb-2">
          <!-- Search input: emits update:searchQuery for v-model-like behavior -->
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
          <!-- v-for over lessons to render each card -->
          <div class="col-md-6 col-lg-4" v-for="lesson in lessons" :key="lesson.id">
            <div class="card h-100">
              <div class="card-body d-flex flex-column">

              <!-- Image: lesson.image should be a valid URL/path.
                   If you store images in your frontend repo, the image path can be:
                   '/images/filename.jpg' or './images/filename.jpg' depending on where index.html is served from.
                   If images are hosted on backend, use the full URL (https://your-backend/images/filename.jpg).
                   If lesson.image is empty/undefined, browser will show broken image — consider a fallback. -->
              <img v-if="lesson.image" :src="lesson.image" alt="Lesson image" class="img-fluid mb-3 rounded">
              <!-- optional fallback if no image provided -->
              <div v-else class="mb-3" style="min-height:120px; background:#f6f6f6; display:flex; align-items:center; justify-content:center;">
                <small class="text-muted">No image</small>
              </div>

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

                  <div class="d-flex align-items-center">
                    <!-- minus button -->
                    <button class="btn btn-sm btn-outline-danger me-2"
                            :disabled="lesson.qty <= 0"
                            @click="$emit('removeOne', lesson)">
                      <i class="fa-solid fa-minus"></i>
                    </button>

                    <!-- quantity -->
                    <span><strong>{{ lesson.qty }}</strong></span>

                    <!-- plus button -->
                    <button class="btn btn-sm btn-outline-primary ms-2"
                            :disabled="lesson.spaces === 0"
                            @click="$emit('addToCart', lesson)">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
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
