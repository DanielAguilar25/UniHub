from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        preferred_name = data.get('preferred_name', '')
        major = data.get('major')
        graduation_year = data.get('graduation_year')
        current_classes = data.get('current_classes', '')

        # make sure email is utrgv
        if not email.endswith('@utrgv.edu'):
            return JsonResponse({'error': 'must use a utrgv.edu email'}, status=400)

        # make sure username is not taken
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'username already taken'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        from .models import Profile
        Profile.objects.get_or_create(user=user)
        user.profile.preferred_name = preferred_name
        user.profile.major = major
        user.profile.graduation_year = graduation_year
        user.profile.current_classes = current_classes
        user.profile.save()

        return JsonResponse({'message': 'account created successfully'}, status=201)
    return JsonResponse({'message': 'send a POST request to register'})

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # create profile if it doesn't exist
            from .models import Profile
            Profile.objects.get_or_create(user=user)
            return JsonResponse({'message': 'login successful'})
        else:
            return JsonResponse({'error': 'invalid credentials'}, status=400)
    return JsonResponse({'message': 'send a POST request to login'})


@csrf_exempt
def profile_data(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'not logged in'}, status=401)
    
    profile = request.user.profile
    return JsonResponse({
        'preferred_name': profile.preferred_name,
        'major': profile.major,
        'graduation_year': profile.graduation_year,
        'current_classes': profile.current_classes,
    })