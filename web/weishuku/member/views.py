from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from django.shortcuts import render, redirect
from member.forms import LoginForm, RegisterForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

def my_login(request):
    context = dict()
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            account = form.cleaned_data['account']
            password = form.cleaned_data['password']
            remember = form.cleaned_data['remember']
            user = authenticate(username=account, password=password)
            if user is not None:
                login(request, user)
                #print 'user of session:%s' % (request.user.is_authenticated())
                #print 'user of name:%s ' % request.user.username
                #return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
                return redirect('/', context)
            else:
                context['form'] = LoginForm()
                return render(request, 'member/login.html', context)
    else:
        context['form'] = LoginForm()
        #request.session['next'] = request.META.get('HTTP_REFERER')
        #print ' pre:%s ' % request.META.get('HTTP_REFERER')
    return render(request, 'member/login.html', context)

def register(request):
    context = dict()
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            account = form.cleaned_data['account']
            password = form.cleaned_data['password']
            remember = form.cleaned_data['remember']
            user = User.objects.create_user(username=account, password=password)
            user = authenticate(username=account, password=password)
            if user is not None:
                login(request, user)
            return redirect('/', context)
        else:
            context['form'] = form
            return render(request, 'member/register.html', context)
    else:
        context['form'] = RegisterForm()
        return render(request, 'member/register.html', context)
