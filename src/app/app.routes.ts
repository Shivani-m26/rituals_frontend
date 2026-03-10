import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { JournalComponent } from './pages/journal/journal.component';
import { JournalWriteComponent } from './pages/journal/journal-write/journal-write.component';
import { JournalHistoryComponent } from './pages/journal/journal-history/journal-history.component';
import { JournalDetailComponent } from './pages/journal/journal-detail/journal-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { TodoComponent } from './pages/todo/todo.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TrackerListComponent } from './pages/tracker/tracker-list/tracker-list.component';
import { TrackerDetailComponent } from './pages/tracker/tracker-detail/tracker-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'analysis', component: AnalysisComponent, canActivate: [AuthGuard] },
    { path: 'todo', component: TodoComponent, canActivate: [AuthGuard] },
    { path: 'tracker', component: TrackerListComponent, canActivate: [AuthGuard] },
    { path: 'tracker/:id', component: TrackerDetailComponent, canActivate: [AuthGuard] },
    { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { 
        path: 'journal', 
        component: JournalComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'write', pathMatch: 'full' },
            { path: 'write', component: JournalWriteComponent },
            { path: 'history', component: JournalHistoryComponent },
            { path: 'history/:id', component: JournalDetailComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '**', redirectTo: '' }
];
