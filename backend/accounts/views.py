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
        'hashtags': profile.hashtags,
        'linkedin_url': profile.linkedin_url,
    })
    
@csrf_exempt
def users_list(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'not logged in'}, status=401)
    
    from .models import Profile
    profiles = Profile.objects.select_related('user').all()
    users = []
    for p in profiles:
        users.append({
            'username': p.user.username,
            'preferred_name': p.preferred_name,
            'major': p.major,
            'graduation_year': p.graduation_year,
            'current_classes': p.current_classes,
            'hashtags': p.hashtags,
            'linkedin_url': p.linkedin_url,
        })
    return JsonResponse({'users': users})

@csrf_exempt
def send_connect_email(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'not logged in'}, status=401)

    if request.method == 'POST':
        data = json.loads(request.body)
        recipient_username = data.get('username')
        message = data.get('message')

        try:
            recipient = User.objects.get(username=recipient_username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'user not found'}, status=404)

        sender_name = request.user.profile.preferred_name or request.user.username

        from django.core.mail import send_mail
        from django.conf import settings

        send_mail(
            subject=f'UniHub: {sender_name} wants to connect with you',
            message=f'Hi {recipient.profile.preferred_name or recipient.username},\n\n{sender_name} sent you a message on UniHub:\n\n"{message}"\n\nReply directly to {request.user.email} to continue the conversation.',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[recipient.email],
        )

        return JsonResponse({'message': 'email sent successfully'})

    return JsonResponse({'error': 'POST only'}, status=405)

@csrf_exempt
def get_schedule(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'not logged in'}, status=401)
    
    from .models import ScheduleEntry
    entries = ScheduleEntry.objects.filter(user=request.user)
    schedule = {}
    for entry in entries:
        key = f'{entry.day}_{entry.time_slot}'
        schedule[key] = entry.class_name
    return JsonResponse({'schedule': schedule})

@csrf_exempt
def save_schedule(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'not logged in'}, status=401)
    
    if request.method == 'POST':
        from .models import ScheduleEntry
        data = json.loads(request.body)
        entries = data.get('entries', [])
        
        # clear existing schedule first
        ScheduleEntry.objects.filter(user=request.user).delete()
        
        # save new entries
        for entry in entries:
            ScheduleEntry.objects.create(
                user=request.user,
                day=entry['day'],
                time_slot=entry['time_slot'],
                class_name=entry['class_name'],
            )
        
        return JsonResponse({'message': 'schedule saved'})
    return JsonResponse({'error': 'POST only'}, status=405)

@csrf_exempt
def save_hashtags(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'not logged in'}, status=401)
    
    if request.method == 'POST':
        data = json.loads(request.body)
        hashtags = data.get('hashtags', '')
        request.user.profile.hashtags = hashtags
        request.user.profile.save()
        return JsonResponse({'message': 'hashtags saved'})
    return JsonResponse({'error': 'POST only'}, status=405)

@csrf_exempt
def update_profile(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'not logged in'}, status=401)
    
    if request.method == 'POST':
        data = json.loads(request.body)
        profile = request.user.profile
        profile.linkedin_url = data.get('linkedin_url', profile.linkedin_url)
        profile.preferred_name = data.get('preferred_name', profile.preferred_name)
        profile.major = data.get('major', profile.major)
        profile.graduation_year = data.get('graduation_year', profile.graduation_year)
        profile.current_classes = data.get('current_classes', profile.current_classes)
        profile.save()
        return JsonResponse({'message': 'profile updated'})
    return JsonResponse({'error': 'POST only'}, status=405)


@csrf_exempt
def reset_password(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'not logged in'}, status=401)

    if request.method == 'POST':
        import secrets
        import string
        from django.core.mail import send_mail
        from django.conf import settings

        chars = string.ascii_letters + string.digits + '!@#$%'
        new_password = ''.join(secrets.choice(chars) for _ in range(12))

        request.user.set_password(new_password)
        request.user.save()

        send_mail(
            subject='UniHub — your new password',
            message=f'Hi {request.user.profile.preferred_name or request.user.username},\n\nYour password has been reset. Here is your new temporary password:\n\n{new_password}\n\nPlease log in and update it right away.',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[request.user.email],
        )

        return JsonResponse({'message': 'new password sent to your email'})
    return JsonResponse({'error': 'POST only'}, status=405)


@csrf_exempt
def delete_account(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'not logged in'}, status=401)

    if request.method == 'POST':
        data = json.loads(request.body)
        password = data.get('password')

        from django.contrib.auth import authenticate
        user = authenticate(request, username=request.user.username, password=password)
        if user is None:
            return JsonResponse({'error': 'incorrect password'}, status=400)

        user.delete()
        return JsonResponse({'message': 'account deleted'})
    return JsonResponse({'error': 'POST only'}, status=405)