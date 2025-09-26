import { getDatabase } from './mongodb'
import { ObjectId } from 'mongodb'

async function findUserById(id: string) {
  const db = await getDatabase()
  return db.collection('users').findOne({ _id: new ObjectId(id) })
}

async function findJobById(id: string) {
  const db = await getDatabase()
  return db.collection('jobs').findOne({ _id: new ObjectId(id) })
}

async function createNotification(notification: {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
}) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/notifications/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification)
    })
    
    if (!response.ok) {
      throw new Error('Failed to create notification')
    }
    
    return await response.json()
  } catch (error) {
    console.error('[Notification Error]:', error)
    return null
  }
}

export async function handleApplicationEvent(application: any, event: 'new' | 'status_change') {
  const worker = await findUserById(application.workerId)
  const job = await findJobById(application.jobId)
  const employer = await findUserById(application.employerId)

  if (event === 'new') {
    // Notify employer
    await createNotification({
      userId: application.employerId.toString(),
      type: 'job_application',
      title: 'New Application',
      message: `${worker?.profile?.firstName} ${worker?.profile?.lastName} applied for ${job?.title}`,
      data: {
        applicationId: application._id.toString(),
        jobId: job?._id.toString(),
        actionUrl: `/dashboard/applicants/${application._id}`
      }
    })
  }

  if (event === 'status_change') {
    // Notify worker
    await createNotification({
      userId: application.workerId.toString(),
      type: 'application_update',
      title: 'Application Status Updated',
      message: `Your application for ${job?.title} has been ${application.status}`,
      data: {
        applicationId: application._id.toString(),
        jobId: job?._id.toString(),
        status: application.status,
        actionUrl: `/dashboard/applications/${application._id}`
      }
    })

    // If hired, notify employer's team
    if (application.status === 'hired') {
      await createNotification({
        userId: application.employerId.toString(),
        type: 'hire_complete',
        title: 'New Hire Completed',
        message: `${worker?.profile?.firstName} ${worker?.profile?.lastName} has been hired for ${job?.title}`,
        data: {
          applicationId: application._id.toString(),
          jobId: job?._id.toString(),
          workerId: worker?._id.toString(),
          actionUrl: `/dashboard/workers/${worker?._id}`
        }
      })
    }
  }
}