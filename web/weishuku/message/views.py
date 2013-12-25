# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render, redirect
from django.views.decorators.cache import cache_page
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, Group
from django.db.models import Count
import json
import datetime
import urllib2

from message.models import Message


@login_required
def index(request):
    context = dict()
    context['is_login'] = request.user.is_authenticated()
    context['username'] = request.user.username
    context['msg_num'] = Message.objects.filter(targetid=request.user.id, status=0).count()
    context['msg_list'] = Message.objects.filter(targetid=request.user.id)
    for msg in context['msg_list']:
        user = User.objects.filter(id=msg.originid)[0]
        group = ';'.join([g.name for g in user.groups.all()])
        msg.username = user.username
        msg.groupname = group
    return render(request, 'message/index.html', context)

@login_required
def handle_msg(request, id):
    msg = Message.objects.filter(id=id)[0]
    msg.status = 1
    msg.save()
    return redirect(msg.handler)

@login_required
def msg_num(request):
    q = Message.objects.filter(targetid=request.user.id, status=0).count()
    return HttpResponse(json.dumps(q), content_type="application/json")

