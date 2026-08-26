<script setup>
import { onMounted, ref} from 'vue'

const objects = ref([])
const error = (null)
onMounted (async () => {
  try {
//aki consumiria la api desde el backend
      const response = await 
      fetch('http://127.0.0.1:8000/api/objects/',{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'aplication/json'
        }
    })
    
      if (!response.ok) {
      throw new Error (`HTTP $ {response.status}`)
      }

      objects.value = await
    response.json()
      } catch (err) {
        error.value = err.message
      }
})

</script>

<template>
  <main>
    <h1> Prueba pal cors</h1>

    <p v-if="error">
      Error: {{  error }}
    </p>
    <pre v-else>{{ objects }}</pre>
  </main>
</template>
