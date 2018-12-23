# Dog-Image-Library

##Practicing with Javascript constructor functions and prototypes to make a dog image library

A micro collection of methods that suit your dog needs

### Usage

```javascript
download randomdog.js and include it in your html file
```

### Docs

```javascript
-----------------

Dog.every() # returns `a list of all dog breeds`
-----------------

Dog.random(number) # returns `a random dog image (number argument is optional
and returns that amount of random dog images)`

Ex: Dog.random(3)
-----------------

Dog.breed(breed, random)

# returns `an array of dog images of the
dog breed passed in (breed argument is required. random argument is optional
and returns a single random image of the selected breed)`

Ex: Dog.breed('hound', true)
-----------------

Dog.subBreed(breed, subBreed, random)

# returns `an array of sub breeds of main passed in. (breed and subBreed
argument are required. Random argument is optional and returns a single
random image of the selected subBreed)`

Ex: Dog.subBreed('hound', 'afghan', true)
-----------------

Dog.subBreedList(breed)

# returns `an array of subBreeds for the passed in breed. (breed argument
is required)`

Ex: Dog.subBreedList('hound')
```
